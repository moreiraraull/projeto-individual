// Credenciais que estão no .env
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function pesquisarMusica(req, res) {
    var pesquisa = req.body.termo; // Recebe a busca enviada pelo front

    // Validando que a busca não veio vazia
    if (pesquisa == undefined || pesquisa == "") {
        res.status(400).send("A busca está vazia!");
        return;
    }

    try {
        // O primeiro fetch é para solicitar o Token de Acesso
        var tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // O Spotify exige que as chaves sejam enviadas em Base64, então esse comando converte para Base64
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
            },
            body: 'grant_type=client_credentials'
        });
        
        var tokenData = await tokenResponse.json();
        var token = tokenData.access_token;

        // Pesquisar a música usando o Token
        var searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=5`, { // type=track para buscar músicas, limit=5 para limitar a 5 resultados
            headers: {
                'Authorization': 'Bearer ' + token // Insere o token que foi buscado para a autorização
            }
        });

        var searchData = await searchResponse.json();
        
        // Devolve as 5 músicas para o front-end em formato json
        res.json(searchData);

    } catch (erro) {
        console.log("Erro na integração com o Spotify:", erro);
        res.status(500).json(erro);
    }
}

module.exports = {
    pesquisarMusica
};