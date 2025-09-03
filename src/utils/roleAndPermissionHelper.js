import {useUserStore} from "stores/userStore.js";

function hasRoles(data) {
  const userStore = useUserStore()
  const userRoles = userStore.rolesOfLoggedUser
  return userRoles?.some(role => data.includes(role.name))
}


function hasPermissions(data){
  const userStore = useUserStore()
  const userPermissions = userStore.permissionsOfLoggedUser
  return userPermissions?.some(permission => data.includes(permission.name))
}


export {hasRoles, hasPermissions}
