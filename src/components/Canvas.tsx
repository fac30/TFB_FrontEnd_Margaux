export default function Canvas({
    items,
    onDeleteItem,
  }: {
    items: string[];
    onDeleteItem: (index: number) => void;
  }) {
    return (
      <div
        style={{
          border: "2px dashed gray",
          height: "300px",
          margin: "20px 0",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h3>Your Outfit</h3>
        {items.length === 0 ? (
          <p>No items selected yet. Start building your outfit!</p>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span>{item}</span>
              <button
                onClick={() => onDeleteItem(index)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
  