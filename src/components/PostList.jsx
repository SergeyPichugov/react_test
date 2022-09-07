import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PostItem from './PostItem';



function PostList({posts, title, remove}) {
    if (!posts.length) {
        return (
            <div>
                <h1>Посты не найдены</h1>
            </div>
        )
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {title}
            </h1>
            <TransitionGroup>
                {
                    posts.map((post, index) => (
                        <CSSTransition
                            key={post.id}
                            timeout={300}
                            classNames="post"
                        >
                            <PostItem remove={remove} index={index + 1} post={post}/>

                        </CSSTransition>
                    ))
                }
            </TransitionGroup>

        </div>
     );
}

export default PostList;