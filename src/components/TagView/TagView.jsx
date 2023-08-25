import React from 'react';
import './TagView.css';

const TagView = ({ tag, onAddChild, onUpdateName, onUpdateData }) => {
  const [name, setName] = React.useState(tag.name);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
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
    if (tag.children === undefined) {
      tag.children = [];
    }
    onAddChild(tag);
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
      </div>
      {!isCollapsed && tag.children && (
        <div className="tag-children">
          {tag.children.map((child) => (
            <TagView
              key={child.name}
              tag={child}
              onAddChild={handleAddChild}
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
      {!tag.children && (
        <button onClick={handleAddChild} className="add-child-button">
          Add Child
        </button>
      )}
    </div>
  );
};

export default TagView;
