"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {

  const { data: session } = useSession();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState([]);
  
    //updated our posts data
    useEffect(() => {
      const fetchPosts = async () => {
        //only post for a specific user
        const response = await fetch(`/api/users/${session?.user.id}/posts`); 
        const data = await response.json(); //from the res we can get our data 
  
        setMyPosts(data);
      }
      // we only want to fetch data if we have the user to fetch posts for.
      if(session?.user.id) fetchPosts();
    }, [])

    //must pass the post inside the function
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete the prompt?");

      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          });

          //only delete the selected post
          const filteredPosts = myPosts.filter((item) => item._id !== post._id);

          setMyPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    <Profile 
        name="My"
        desc="Welcom to your personalized profile page."
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;