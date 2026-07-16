// src/pages/api/github.ts
import type { APIRoute } from 'astro';

export const prerender = false; // Statik cache'lenmeyi kesin olarak kırıyoruz

const GITHUB_USERNAME = 'seromitschu';

export const GET: APIRoute = async () => {
  try {
    const token = import.meta.env.GITHUB_TOKEN;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'seromitschu-portfolio'
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // 1. Profil Verisi Fetch Et
    const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
    if (!profileRes.ok) throw new Error(`Profile API Hatası: ${profileRes.status}`);
    const profileData = await profileRes.json();

    // 2. Repolar Verisi Fetch Et
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers });
    if (!reposRes.ok) throw new Error(`Repos API Hatası: ${reposRes.status}`);
    const reposData = await reposRes.json();

    const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

    const pinnedRepos = reposData
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((repo: any) => ({
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        languageColor: getLanguageColor(repo.language)
      }));

    // 3. Aktivite Akışı
    const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`, { headers });
    if (!eventsRes.ok) throw new Error(`Events API Hatası: ${eventsRes.status}`);
    const eventsData = await eventsRes.json();

    const commits: any[] = [];
    const eventDatesMap: Record<string, number> = {}; // Fallback haritası için tarihleri tutacağız

    if (Array.isArray(eventsData) && eventsData.length > 0) {
      eventsData.forEach((event: any) => {
        const repoShortName = event.repo?.name ? event.repo.name.replace(`${GITHUB_USERNAME}/`, '') : 'Repo';
        const timeAgoStr = formatTimeAgo(new Date(event.created_at));
        
        // Fallback için aktivite günlerini işaretle
        if (event.created_at) {
          const dateKey = event.created_at.split('T')[0];
          eventDatesMap[dateKey] = (eventDatesMap[dateKey] || 0) + (event.payload?.commits?.length || 1);
        }

        let customMessage = '';
        let customUrl = `https://github.com/${event.repo?.name || GITHUB_USERNAME}`;

        if (event.type === 'PushEvent' && event.payload?.commits?.[0]) {
          customMessage = event.payload.commits[0].message;
          customUrl = `https://github.com/${event.repo?.name}/commit/${event.payload.commits[0].sha}`;
        } else if (event.type === 'CreateEvent') {
          customMessage = `Yeni kaynak oluşturuldu (${event.payload?.ref_type || 'repo'})`;
        } else if (event.type === 'WatchEvent') {
          customMessage = `Proje yıldızlandı (Starred)`;
        } else if (event.type === 'ForkEvent') {
          customMessage = `Proje fork edildi`;
        } else {
          const cleanTypeName = event.type.replace('Event', '');
          customMessage = `GitHub Etkinliği: ${cleanTypeName}`;
        }

        commits.push({
          message: customMessage || 'Aktivite detayı güncellendi',
          repoName: repoShortName,
          url: customUrl,
          timeAgo: timeAgoStr,
          created_at: event.created_at
        });
      });
    }

    if (commits.length === 0) {
      commits.push({
        message: "Profil güncellendi ve senkronizasyon tamamlandı",
        repoName: "Geliştirici Odası",
        url: `https://github.com/${GITHUB_USERNAME}`,
        timeAgo: "az önce"
      });
    }

    const cleanCommits = commits.slice(0, 4);
    const latestCommit = cleanCommits[0] || null;

    // YENİ: 4. GitHub GraphQL ile Commit Haritası (Contribution Graph) Verisi Çekme
    let contributions: { count: number; level: number }[] = [];

    if (token) {
      try {
        const graphqlQuery = {
          query: `
            query($username: String!) {
              user(login: $username) {
                contributionsCollection {
                  contributionCalendar {
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { username: GITHUB_USERNAME }
        };

        const graphRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'seromitschu-portfolio'
          },
          body: JSON.stringify(graphqlQuery)
        });

        if (graphRes.ok) {
          const graphData = await graphRes.json();
          const weeks = graphData?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
          
          if (Array.isArray(weeks)) {
            // Tüm günleri tek bir düz diziye indirge
            const allDays = weeks.flatMap((w: any) => w.contributionDays || []);
            
            // Son 12 haftayı (12 hafta * 7 gün = 84 gün) filtrele
            const targetDaysCount = 12 * 7;
            const recentDays = allDays.slice(-targetDaysCount);

            contributions = recentDays.map((d: any) => {
              const count = d.contributionCount || 0;
              // Commit sayısına göre high-contrast seviyelendirmesi (0 - 4 arası)
              let level = 0;
              if (count > 0 && count <= 2) level = 1;
              else if (count > 2 && count <= 5) level = 2;
              else if (count > 5 && count <= 8) level = 3;
              else if (count > 8) level = 4;

              return { count, level };
            });
          }
        }
      } catch (graphErr) {
        console.warn("GraphQL Grafiği çekilirken hata oluştu, Fallback moduna geçiliyor:", graphErr);
      }
    }

    // YENİ: Akıllı Fallback Mekanizması
    // Eğer GraphQL başarısız olursa veya Token yoksa, UI'ın boş kalmaması için son 84 günü simüle eder
    if (contributions.length === 0) {
      const today = new Date();
      for (let i = 83; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        
        // Eğer public event akışında bu tarihe ait veri varsa oradan besle, yoksa 0 yap
        const eventCount = eventDatesMap[dateStr] || 0;
        let simulatedLevel = 0;
        if (eventCount > 0 && eventCount <= 2) simulatedLevel = 1;
        else if (eventCount > 2) simulatedLevel = 2;

        contributions.push({
          count: eventCount,
          level: simulatedLevel
        });
      }
    }

    return new Response(
      JSON.stringify({
        profile: { login: profileData.login, avatar_url: profileData.avatar_url, html_url: profileData.html_url, bio: profileData.bio },
        stats: { public_repos: profileData.public_repos, followers: profileData.followers, total_stars: totalStars },
        latestCommit: latestCommit,
        commits: cleanCommits,
        repos: pinnedRepos,
        contributions: contributions // YENİ: Arayüze gönderilen grafik matrisi
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        } 
      }
    );

  } catch (error: any) {
    console.error("YAKALANAN HATA:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'GitHub Sync Failed', 
        commits: [{ message: "GitHub bağlantısı kontrol ediliyor", repoName: "Sistem", url: "#", timeAgo: "az önce" }] 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = { yıl: 31536000, ay: 2592000, gün: 86400, saat: 3600, dakika: 60 };
  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) return `${count} ${unit} önce`;
  }
  return 'az önce';
}

function getLanguageColor(lang: string | null): string {
  if (!lang) return '#86868b';
  
  const colors: Record<string, string> = {
    'Astro': '#ff5d01',
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Svelte': '#ff3e00',
    'Python': '#3572A5',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'Java': '#b07219',
    'Go': '#00add8',
    'Rust': '#dea584',
    'PHP': '#4f5d95',
    'Ruby': '#701516',
    'Swift': '#f05138',
    'Kotlin': '#a97bff',
    'Dart': '#00b4ab',
    'SQL': '#e38c00',
    'Shell': '#89e051',
    'Makefile': '#427819',
    'Dockerfile': '#384d54',
    'Lua': '#000080',
    'Perl': '#0298c3',
    'R': '#198ce7',
    'Objective-C': '#438eff',
    'Scala': '#c22d40',
    'Haskell': '#5e5086'
  };

  return colors[lang] || '#86868b';
}