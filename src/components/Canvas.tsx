import React, { useState } from "react";

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

  // Handle the dragging movement
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

  // Handle the end of the drag
  const handleDragEnd = () => {
    setDraggingItemIndex(null); // Stop dragging
  };

  // Attach mouse and touch event listeners
  React.useEffect(() => {
    if (draggingItemIndex !== null) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove, { passive: false });
      document.addEventListener("touchend", handleDragEnd);
    } else {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [draggingItemIndex, offset]);

  // Handle item deletion on mouse or touch events
  const handleDeleteItem = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent component
    onDeleteItem(index); // Call the delete function passed down as a prop
  };

  return (
    <div
      className="canvas-container"
      style={{
        width: "450px", // Fixed width
        height: "350px", // Fixed height
        border: "1px solid #ddd", // Optional for clarity
        overflow: "hidden", // Prevent items from overflowing
        position: "relative", // Allows absolute positioning of items
        marginTop: "20px", // Some spacing for clarity
        background: "url('/images/grid-lines.png')", // Add grid lines image to the background
        backgroundSize: "20px 20px", // Adjust size of grid cells
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${item.y}px`, // Item's vertical position
            left: `${item.x}px`, // Item's horizontal position
            cursor: "pointer",
          }}
          onMouseDown={(e) => handleDragStart(index, e)} // Start dragging with mouse
          onTouchStart={(e) => handleDragStart(index, e)} // Start dragging with touch
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "80px", // Fixed width for each item
              height: "80px", // Fixed height for each item
              objectFit: "cover", // Keep aspect ratio for images
            }}
          />
          <p style={{ textAlign: "center", fontSize: "12px" }}>{item.name}</p>

          {/* Add delete button for each item */}
          <button
            onClick={(e) => handleDeleteItem(index, e)}
            onTouchStart={(e) => handleDeleteItem(index, e)} // Handle touch events for delete
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
