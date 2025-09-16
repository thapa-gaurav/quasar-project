import { acceptHMRUpdate, defineStore } from 'pinia'
import axiosInstance from 'src/utils/axiosInstance.js'

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,

  }),
  getters: {},
  actions: {
    async getPosts() {
      try {
        const res = await axiosInstance.get('posts/index', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        const data = await res.data
        this.posts = data.data
        console.log(this.posts)
        if (!(res.statusText === 'OK')) {
          console.log('Unable to fetch data.')
        }

      } catch (error) {
        console.log("Request failed: " + error)
      }
    },
    async createPost(formData) {
      console.log(formData)
      try {
        const res = await axiosInstance.post('posts/store', formData, {
          headers: {
            'Content-Type':'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to store post.')
        } else {
          const data = await res.data
          console.log(data)
          this.posts = [data, ...this.posts]
          // console.log(this.posts)
          // this.posts = [data.data, this.posts]
          // console.log(this.posts)
          await this.getPosts()
          this.router.push('/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deletePost(postId) {
      try {
        const res = await axiosInstance.delete('/post/delete/' + postId, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        console.log(res.statusText)
        if (!(res.statusText === 'OK')) {
          console.log('Unable to delete post.')
        } else {
          const data = await res.data
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editPosts() {
      console.log(this.currentPost.caption)
      try {
        const res = await axiosInstance.patch(
          'posts/update/' + this.currentPost.id,
          this.currentPost,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('userToken'),
            },
          },
        )
        if (!(res.statusText === 'OK')) {
          console.log('Unable to edit post.')
        } else {
          const data = await res.data
          console.log(data)
          await this.getPosts()
          this.router.push('/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async showPost(post){
      try{
        const res = await axiosInstance.get(`/posts/show/${post}`,{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to show post.')
        } else {
          const data = await res.data
          this.currentPost = data.data
          console.log(this.currentPost)
        }

      }catch (error){
        console.log(error)
      }
    },

    async changeImage(post){
      try{
        const res = await axiosInstance.post('/post/image/replace/'+this.currentPost.id,post,{
          headers:{
            'Content-Type':'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          }
        })
        if(!(res.statusText === 'OK')) {
          console.log('Unable to change image.')
        }else {
          await this.showPost(this.currentPost.id)
        }
      }catch (error){
        console.log(error)
      }
    },
    async detachImage(){
      try {
        const res = await axiosInstance.post('/post/image/detach/'+this.currentPost.id,{},{
        headers:{
          'Content-Type':'multipart/form-data',
          Authorization:'Bearer ' + localStorage.getItem('userToken'),
        }
        })
        if(!(res.statusText === 'OK')){
          console.log('Unable to detach image.')
        }else {
          await this.showPost(this.currentPost.id)
        }
      }catch (error){
        console.log(error)
      }
    },
    currentPosts(post) {
      this.currentPost = JSON.parse(JSON.stringify(post))
      console.log(this.currentPost)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
