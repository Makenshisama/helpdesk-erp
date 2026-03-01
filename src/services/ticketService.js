/**
 * Camada responsável por comunicação com a API.
 * Mantém o componente desacoplado das regras de requisição HTTP.
 */

const API_URL = "http://localhost:3000";

export async function getTickets() {
  const response = await fetch(`${API_URL}/tickets`);
  return response.json();
}

export async function createTicket(ticket) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  return response.json();
}

export async function deleteTicket(id) {
  const response = await fetch(`http://localhost:3000/tickets/${id}`, {
    method: "DELETE",
  });

  return response.json();
}

export async function updateTicket(id, ticket) {
  const response = await fetch(`http://localhost:3000/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ticket)
  });

  return response.json();
}

