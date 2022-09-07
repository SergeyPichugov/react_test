import postcss from 'postcss';
import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';


const PostFilter = ({filter, setFilter}) => {

    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue={'сортировка'}
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По содержанию'}
                ]}
            />

        </div>
     );
}

export default PostFilter;