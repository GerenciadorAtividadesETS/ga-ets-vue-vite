import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Subjects from '../views/Subjects.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Activities from '../views/Activities.vue'
import ActivityDetail from '../views/ActivityDetail.vue'

const routes = [
    {path: "/", name: "Home", component: Home},
    {path: "/subjects", name: "Subjects", component: Subjects},
    {path: "/subjects/:subjectId", name: "Subject", component: Activities},
    {path: "/subjects/:subjectId/:activityId", name: "Activity", component: ActivityDetail},
    {path: "/login", name: "Login", component: Login},
    {path: "/register", name: "Register", component: Register},
]

const router = createRouter({
        history: createWebHistory(),
        routes
})
export default router
