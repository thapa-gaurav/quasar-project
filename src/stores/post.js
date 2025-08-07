import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,
  }),
  getters: {},
  actions: {
    async getPosts() {
      try {
        const res = await fetch('http://localhost:8000/api/posts/index', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })

        const data = await res.json()
        this.posts = data.data
        console.log(this.posts)
        if (!res.ok) {
          console.log('Unable to fetch data.')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async createPost(newPost) {
      try {
        const res = await fetch('http://localhost:8000/api/posts/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
          body: JSON.stringify(newPost),
        })

        if (!res.ok) {
          console.log('Unable to store post.')
        } else {
          const data = await res.json()
          console.log(data)
          this.posts = [data, ...this.posts]
          // console.log(this.posts)
          // this.posts = [data.data, this.posts]
          // console.log(this.posts)
          this.router.push('/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deletePost(postId) {
      try {
        const res = await fetch('http://localhost:8000/api/post/delete/' + postId, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })

        if (!res.ok) {
          console.log('Unable to delete post.')
        } else {
          const data = await res.json()
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editPosts() {
      console.log(this.currentPost.caption)
      try {
        const res = await fetch('http://localhost:8000/api/posts/update/' + this.currentPost.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
          body: JSON.stringify(this.currentPost),
        })

        if (!res.ok) {
          console.log('Unable to edit post.')
        } else {
          const data = await res.json()
          console.log(data)
          this.router.push('/dashboard')
        }
      } catch (error) {
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
