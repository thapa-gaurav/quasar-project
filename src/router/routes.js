import LoginForm from 'src/components/LoginForm.vue'
import PostDashboard from 'src/components/PostDashboard.vue'
import CreatePost from 'src/components/CreatePost.vue'
import EditPost from 'src/components/EditPost.vue'

const routes = [
  {
    path: '/login',
    component: LoginForm,
  },
  {
    path: '/dashboard',
    component: PostDashboard,
  },
  {
    path: '/create',
    component: CreatePost,
  },
  {
    path: '/edit',
    component: EditPost,
  },
]

export default routes
