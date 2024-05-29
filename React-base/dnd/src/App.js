import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary GoodSpeed'
  },
  {
    id: 'cato',
    name: 'Little Cato'
  },
  {
    id: 'kvn',
    name: 'KVN'
  }
];

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{props.name}</p>
    </li>
  );
}

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCharacters((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={characters} strategy={rectSortingStrategy}>
            <ul className="characters">
              {characters.map(({ id, name }) => (
                <SortableItem key={id} id={id} name={name} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </header>
    </div>
  );
}

export default App;
