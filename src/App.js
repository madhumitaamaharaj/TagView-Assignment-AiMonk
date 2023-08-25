import React, { useState } from 'react';
import TagView from './components/TagView/TagView';
import './App.css';

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

const App = () => {
  const [tree, setTree] = useState(initialTree);

  const handleAddChild = (parentTag) => {
    const newChild = { name: `new-child-${Date.now()}`, data: '' };
    parentTag.children.push(newChild);
    setTree({ ...tree });
  };

  const handleUpdateName = (tag, newName) => {
    tag.name = newName;
    setTree({ ...tree });
  };

  const handleUpdateData = (tag, newData) => {
    tag.data = newData;
    setTree({ ...tree });
  };

  const handleExport = () => {
    const exportedData = JSON.stringify(tree, null, 2); 
    console.log(exportedData);
  };

  return (
    <div className="app">
      <TagView tag={tree} onAddChild={handleAddChild} onUpdateName={handleUpdateName} onUpdateData={handleUpdateData} />
      <button onClick={handleExport} className="export-button">
        Export
      </button>
    </div>
  );
};

export default App;
