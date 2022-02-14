const ApiKey = "117a41f989f7c52da2f32729083072f6";
const ApiToken =
  "a84094a1403cebdcc98b7d698756dfaad76359ac6d80010d97088f33d645da90";
const OrgID = "6180ff85ef81ba865071b1d3";

export async function createBoard(name, color) {
  return fetch(
    `https://api.trello.com/1/boards/?name=${name}&key=${ApiKey}&token=${ApiToken}&prefs_background=${color}`,
    {
      method: "POST",
    }
  );
}
export async function getAllBoards() {
  return fetch(
    `https://api.trello.com/1/organizations/${OrgID}/boards?list=all&key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
    }
  );
}

export async function getBoard(id) {
  return fetch(
    `https://api.trello.com/1/boards/${id}?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function deleteABoard(boardId) {
  return fetch(
    `https://api.trello.com/1/boards/${boardId}?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "DELETE",
    }
  );
}

export async function getAOrganization(orgId) {
  return fetch(
    `https://api.trello.com/1/organizations/${orgId}?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
}
