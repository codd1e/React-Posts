import React from 'react';
import Input from "./UI/input/Input";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <Input value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})} placeholder="Поиск..."/>
            <MySelect value={filter.sort} onChange={selectedSort => setFilter({...filter, sort: selectedSort})} defaultValue='Сортировка по' options={[{value: 'title', name: 'По названию'}, {value: 'body', name: 'По описанию'}]}/>
        </div>
    );
};

export default PostFilter;