const ApiKey = "117a41f989f7c52da2f32729083072f6";
const ApiToken =
  "a84094a1403cebdcc98b7d698756dfaad76359ac6d80010d97088f33d645da90";

export async function getAllListsForABoard(id) {
  return fetch(
    `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function getAllCardsForList(listId) {
  return fetch(
    `https://api.trello.com/1/lists/${listId}/cards?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function createANewList(boardId, name) {
  return fetch(
    `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${ApiKey}&token=${ApiToken}&pos=bottom`,
    {
      method: "POST",
    }
  );
}

export async function deleteAList(listId) {
  return fetch(
    `https://api.trello.com/1/lists/${listId}/closed?key=${ApiKey}&token=${ApiToken}&value=true`,
    {
      method: "PUT",
    }
  );
}

export async function moveCardToList(cardId, listId) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}?idList=${listId}&token=${ApiToken}&key=${ApiKey}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function updateNameOnList(listId, name) {
  return fetch(
    `https://api.trello.com/1/lists/${listId}?key=${ApiKey}&token=${ApiToken}&name=${name}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    }
  );
}
