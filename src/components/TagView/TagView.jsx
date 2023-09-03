import React from 'react';
import './TagView.css';

const TagView = ({ tag, onAddChild, onUpdateName, onUpdateData }) => {
  const [name, setName] = React.useState(tag.name);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [newChildName, setNewChildName] = React.useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameEditComplete = () => {
    onUpdateName(tag, name);
    setIsEditingName(false);
  };

  const handleAddChild = () => {
    if (!tag.children) {
      tag.children = [];
    }
    const initialChildName = `nested ${newChildName || 'child'}`; 
    const newChild = { name: initialChildName, children: [], data: '' };
    tag.children.push(newChild);
    onAddChild(newChild); 
    setNewChildName('');
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`tag ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="tag-name">
        <button onClick={handleToggleCollapse}>
          {isCollapsed ? '>' : 'v'}
        </button>
        &nbsp;
        {isEditingName ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameEditComplete}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleNameEditComplete();
              }
            }}
          />
        ) : (
          <span onClick={handleNameEdit}>{tag.name}</span>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleAddChild} className="add-child-button">
          Add Child
        </button>
      </div>
      {!isCollapsed && tag.children && (
        <div className="tag-children">
          {tag.children.map((child) => (
            <TagView
              key={child.name}
              tag={child}
              onAddChild={onAddChild}
              onUpdateName={onUpdateName}
              onUpdateData={onUpdateData}
            />
          ))}
        </div>
      )}
      {!isCollapsed && !tag.children && (
        <div>
          <label htmlFor={`data-${tag.name}`}>Data:</label>
          <input
            id={`data-${tag.name}`}
            value={tag.data}
            onChange={(event) => onUpdateData(tag, event.target.value)}
            className="tag-data"
          />
        </div>
      )}
    </div>
  );
};

export default TagView;
