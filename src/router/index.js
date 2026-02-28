import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import ClientList from "../views/ClientList.vue";
import CreateClient from "../views/CreateClient.vue";
import Tickets from "../views/Tickets.vue";
import EditClient from "../views/EditClient.vue";
import DeletedClients from "../views/DeletedClients.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/tickets", component: Tickets },
  { path: "/clients", component: ClientList },
  { path: "/clients/new", component: CreateClient },
  { path: "/clients/:id/edit", component: EditClient},
  { path: "/clients/deleted", component: DeletedClients}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
