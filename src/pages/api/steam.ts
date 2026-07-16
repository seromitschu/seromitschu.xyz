export const runtime = 'edge';

export async function GET() {
  const apiKey = import.meta.env.STEAM_API_KEY;
  const steamId = import.meta.env.STEAM_ID;

  if (!apiKey || !steamId) {
    return new Response(JSON.stringify({ error: "API credentials missing" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Mevcut 3 isteğe dokunulmadan sadece GetSteamLevel endpoint'i eklendi
    const [ownedRes, summaryRes, recentRes, levelRes] = await Promise.all([
      fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`),
      fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`),
      fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`),
      fetch(`https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${apiKey}&steamid=${steamId}`) // <-- LEVEL İÇİN EKLENEN SATIR
    ]);

    const ownedData = await ownedRes.json();
    const summaryData = await summaryRes.json();
    const recentData = await recentRes.json();
    const levelData = levelRes.ok ? await levelRes.json() : null; // <-- LEVEL İÇİN EKLENEN SATIR

    const player = summaryData.response?.players?.[0];
    const steamLevel = levelData?.response?.player_level || null; // <-- LEVEL İÇİN EKLENEN SATIR

    let baseStatus = "Bilinmiyor";
    let isIngame = false;
    if (player) {
      if (player.gameextrainfo) {
        baseStatus = "Oyunda";
        isIngame = true;
      } else {
        const states = ["Çevrimdışı", "Çevrimiçi", "Meşgul", "Uzakta", "Uykuda", "Takas Arıyor", "Oynamak İstiyor"];
        baseStatus = states[player.personastate] || "Bilinmiyor";
      }
    }

    let profile = player ? {
      name: player.personaname,
      avatar: player.avatarfull,
      profileUrl: player.profileurl,
      country: player.loccountrycode || null,
      statusText: baseStatus,
      statusDetailed: isIngame ? player.gameextrainfo : "",
      statusColor: isIngame ? "#30d158" : (player.personastate > 0 ? "#57cbde" : "#898989"),
      level: steamLevel // <-- HİÇBİR ŞEY SİLİNMEDEN PROFILE İÇİNE ENJEKTE EDİLDİ
    } : null;

    let statusCard = null;
    if (player?.gameextrainfo) {
      statusCard = { id: player.gameid, name: player.gameextrainfo, isLive: true };
    } else if (recentData.response?.games?.length > 0) {
      const lastGame = recentData.response.games[0];
      statusCard = { id: lastGame.appid, name: lastGame.name, isLive: false };
    }

    let stats = { totalGames: 0, totalHours: 0 };
    let allGames = ownedData.response?.games || [];
    if (allGames.length > 0) {
      stats.totalGames = allGames.length;
      stats.totalHours = Math.round(allGames.reduce((acc: number, g: any) => acc + (g.playtime_forever || 0), 0) / 60);
    }

    let recentGames = (recentData.response?.games || []).map((game: any) => ({
      id: game.appid,
      name: game.name,
      playtime2Weeks: Math.round(game.playtime_2weeks / 60)
    }));

    // SINIRSIZ: 2 saatten (120 dk) fazla oynanan TÜM oyunları filtrele ve sırala
    const filteredGames = allGames
      .filter((game: any) => game.name && game.playtime_forever > 120)
      .sort((a: any, b: any) => b.playtime_forever - a.playtime_forever);

    // Her oyun için paralel olarak GERÇEK BAŞARIM yüzdesini hesapla (Orijinal yapı korundu)
    const topGames = await Promise.all(filteredGames.map(async (game: any) => {
      let progressPercent = null;

      try {
        const achRes = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${game.appid}&key=${apiKey}&steamid=${steamId}`);
        if (achRes.ok) {
          const achData = await achRes.json();
          const achievements = achData.playerstats?.achievements;
          
          if (achievements && achievements.length > 0) {
            const unlocked = achievements.filter((a: any) => a.achieved === 1).length;
            progressPercent = Math.round((unlocked / achievements.length) * 100);
          }
        }
      } catch (e) {
        // Başarımı gizli veya şeması olmayan oyunlarda hata vermemesi için null bırakıyoruz
      }

      return {
        id: game.appid,
        name: game.name,
        playtimeHours: Math.round(game.playtime_forever / 60),
        progressPercent: progressPercent 
      };
    }));

    return new Response(JSON.stringify({ profile, statusCard, stats, recentGames, topGames }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch Steam data" }), { status: 500 });
  }
}