import LoginForm from 'src/components/LoginForm.vue'
import PostDashboard from 'src/components/PostDashboard.vue'
import CreatePost from 'src/components/CreatePost.vue'
import EditPost from 'src/components/EditPost.vue'
import IndexPermission from "components/permissions/IndexPermission.vue";
import IndexRole from "components/roles/IndexRole.vue";

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
  {
    path: '/permission',
    component: IndexPermission
  },
  {
    path: '/role',
    component: IndexRole
  }
]

export default routes
