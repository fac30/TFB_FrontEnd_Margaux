import React, { useState, useEffect } from "react";
import './Canvas.css'; // Import the CSS file

interface CanvasProps {
  items: { name: string; image: string; x: number; y: number }[];
  onDeleteItem: (index: number) => void;
  onUpdateItemPosition: (index: number, x: number, y: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ items, onDeleteItem, onUpdateItemPosition }) => {
  const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle the start of the dragging
  const handleDragStart = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    setDraggingItemIndex(index);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const item = items[index];
    setOffset({
      x: clientX - item.x,
      y: clientY - item.y,
    });

    // Prevent default behavior to avoid unwanted scrolling or text selection during drag
    e.preventDefault();
  };

  // Attach mouse and touch event listeners
  useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (draggingItemIndex !== null) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const newX = clientX - offset.x;
        const newY = clientY - offset.y;

        // Update the item position while dragging
        onUpdateItemPosition(draggingItemIndex, newX, newY);
      }
    };

    const handleDragEnd = () => {
      setDraggingItemIndex(null); // Stop dragging
    };

    if (draggingItemIndex !== null) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove, { passive: false });
      document.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [draggingItemIndex, offset, onUpdateItemPosition]);

  // Handle item deletion on mouse or touch events
  const handleDeleteItem = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent component
    onDeleteItem(index); // Call the delete function passed down as a prop
  };

  return (
    <div className="canvas-container">
      {items.map((item, index) => (
        <div
          key={index}
          className="item"
          style={{
            top: `${item.y}px`, // Item's vertical position
            left: `${item.x}px`, // Item's horizontal position
          }}
          onMouseDown={(e) => handleDragStart(index, e)} // Start dragging with mouse
          onTouchStart={(e) => handleDragStart(index, e)} // Start dragging with touch
        >
          <img
            src={item.image}
            alt={item.name}
            className="item-image" // Use CSS class for image
          />
          <p className="item-name">{item.name}</p>

          {/* Add delete button for each item */}
          <button
            onClick={(e) => handleDeleteItem(index, e)}
            onTouchStart={(e) => handleDeleteItem(index, e)} // Handle touch events for delete
            className="delete-button" // Use CSS class for delete button
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
