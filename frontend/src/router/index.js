import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
//import TicketList from "../views/TicketList.vue";
//import CreateTicket from "../views/CreateTicket.vue";
import ClientList from "../views/ClientList.vue";
import CreateClient from "../views/CreateClient.vue";
import Tickets from "../views/Tickets.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/tickets", component: Tickets },
  //{ path: "/tickets", component: TicketList },
  //{ path: "/tickets/novo", component: CreateTicket },
  { path: "/clients", component: ClientList },
  { path: "/clients/new", component: CreateClient }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
