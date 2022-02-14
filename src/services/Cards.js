const ApiKey = "117a41f989f7c52da2f32729083072f6";
const ApiToken =
  "a84094a1403cebdcc98b7d698756dfaad76359ac6d80010d97088f33d645da90";

export async function createANewCard(listId, name) {
  return fetch(
    `https://api.trello.com/1/cards?idList=${listId}&key=${ApiKey}&token=${ApiToken}&name=${name}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function deleteACard(cardId) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateNameOnCard(cardId, name) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${ApiToken}&name=${name}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function updateDescOnCard(cardId, desc) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${ApiToken}&desc=${desc}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function updatePositionOnCard(cardId, pos) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${ApiToken}&pos=${pos}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    }
  );
}
