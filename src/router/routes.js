import LoginForm from 'src/components/LoginForm.vue'
import PostDashboard from 'src/components/PostDashboard.vue'
import CreatePost from 'src/components/CreatePost.vue'
import EditPost from 'src/components/EditPost.vue'
import IndexPermission from "components/permissions/IndexPermission.vue"
import IndexRole from "components/roles/IndexRole.vue"
import IndexUser from "components/user/IndexUser.vue"
import PasswordChange from "components/PasswordChange.vue";
import App from "src/App.vue";

const routes = [
  {
    path: '/',
    component: App,
  },
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
  {
    path: '/permission',
    component: IndexPermission
  },
  {
    path: '/role',
    component: IndexRole
  },
  {
    path: '/user',
    component: IndexUser
  },
  {
    path: '/passchange',
    component: PasswordChange
  }
]

export default routes
