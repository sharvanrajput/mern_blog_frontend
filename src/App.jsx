import React, { useEffect } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { RouteAddBlog, RouteAddCategorie, RouteBlog, RouteBlogDetails, RouteCategorie, RouteEditBlog, RouteEditCategorie, RouteIndex, RouteProfile, RouteSignin, Routesignup } from './helper/RouteName'
import Profile from './pages/Profile'
import CategoryDetail from './pages/category/CategoryDetail'
import AddCategory from './pages/category/AddCategory'
import EditCategory from './pages/category/EditCategory'
import BlogDetails from './pages/blog/BlogDetails'
import AddBlog from './pages/blog/AddBlog'
import EditBlog from './pages/blog/EditBlog'
import Blogdetails from './components/Blogdetails'



const App = () => {





  return (
    <div>

      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path={RouteIndex} index element={<Home />} />
            <Route path={RouteProfile} index element={<Profile />} />
            {/* blog category  */}
            <Route path={RouteCategorie} index element={<CategoryDetail />} />
            <Route path={RouteAddCategorie} index element={<AddCategory />} />
            <Route path={RouteEditCategorie()} index element={<EditCategory />} />
            {/* blogs */}
            <Route path={RouteBlog} index element={<BlogDetails />} />
            <Route path={RouteAddBlog} index element={<AddBlog />} />
            <Route path={RouteEditBlog()} index element={<EditBlog />} />
            <Route path={RouteBlogDetails()} element={<Blogdetails />} />
          </Route>





          <Route path={RouteSignin} element={<Signin />} />
          <Route path={Routesignup} element={<Signup />} />





        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App