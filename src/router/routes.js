import LoginForm from 'src/components/LoginForm.vue'
import PostDashboard from 'components/post/PostDashboard.vue'
import CreatePost from 'components/post/CreatePost.vue'
import EditPost from 'components/post/EditPost.vue'
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
