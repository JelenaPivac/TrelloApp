const ApiKey = "117a41f989f7c52da2f32729083072f6";
const ApiToken =
  "a84094a1403cebdcc98b7d698756dfaad76359ac6d80010d97088f33d645da90";

export async function getCommentsForCard(cardId) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}/actions?filter=commentCard&key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
    }
  );
}

export async function addANewComment(cardId, comment) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}/actions/comments?text=${comment}&key=${ApiKey}&token=${ApiToken}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
}
