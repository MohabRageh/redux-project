import AddPostForm from "./features/post/AddPostForm";
import PostsList from "./features/post/PostsList";
import SinglePostPage from "./features/post/SinglePostPage";
import Layout from "./components/Layout"
import { Routes,Route } from "react-router-dom";
import EditPost from "./features/post/EditPost";
function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<PostsList/>}/>
          <Route path="post">
            <Route path="edit/:postId" element={<EditPost/>}/>
            <Route index element={<AddPostForm/>}/>
            <Route path=":postId" element={<SinglePostPage/>}/>
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
