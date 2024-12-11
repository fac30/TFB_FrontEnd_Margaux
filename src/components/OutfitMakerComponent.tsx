import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu";
import Canvas from "./Canvas";
//import { Box, Button } from "native-base";
import { Box, VStack, HStack, Button, ScrollView } from "native-base";

// Define a type for saved outfits
interface SavedOutfit {
  id: string;
  items: { name: string; image: string; x: number; y: number }[];
}

export default function OutfitMakerComponent() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { name: string; image: string; x: number; y: number }[]
  >([]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]); // State to store saved outfits
  const [showSavedOutfits, setShowSavedOutfits] = useState(false); // State to toggle views
  const [saveConfirmation, setSaveConfirmation] = useState(false); // Confirmation state

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const [modalOutfit, setModalOutfit] = useState<SavedOutfit | null>(null); // State for modal outfit

  // Toggles the visibility of the category menu
  const toggleMenu = () => setShowMenu((prev) => !prev);

  // Sets the category and shows sub-categories
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null); // Reset selected subcategory when category changes
  };

  // Resets to the top-level categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  // Adds a selected item to the canvas with random position
  const handleItemSelect = (item: { name: string; image: string }) => {
    setSelectedItems((prev) => [
      ...prev,
      {
        ...item,
        x: Math.random() * 390, // Random position for x (within canvas width)
        y: Math.random() * 290, // Random position for y (within canvas height)
      },
    ]);
    setShowMenu(false); // Close menu after item selection (if intended)
  };

  // Deletes an item from the canvas
  const handleDeleteItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Updates item position after dragging
  const handleUpdateItemPosition = (index: number, x: number, y: number) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, x, y } : item))
    );
  };

  // Handle saving the outfit
  const handleSaveOutfit = () => {
    const newOutfit: SavedOutfit = {
      id: new Date().toISOString(), // Use the current time as a unique id
      items: selectedItems,
    };
    setSavedOutfits((prevOutfits) => [...prevOutfits, newOutfit]);
    setSelectedItems([]); // Clear selected items after saving

    // Show confirmation message
    setSaveConfirmation(true);
    setTimeout(() => setSaveConfirmation(false), 2000); // Hide after 2 seconds
  };

  // Toggle between create outfit view and saved outfits view
  const toggleSavedOutfitsView = () => {
    setShowSavedOutfits((prev) => !prev);
  };

  return (
    <Box
      w="80%"
      maxW="100vw"
      minW="50vw"
      // minH="100vh"
      // overflow="hidden"
      // px={2} // reduced padding for mobile

      flex={1}
      safeArea
      bg="white"
    >
      <VStack
        space={4}
        alignItems="center"
        justifyContent="center"
        flex={1}
        padding={0}
      >
        <ScrollView flex={1} width="100%">
          <div
            style={{
              backgroundColor: "green",
              width: "90%",
              maxWidth: "1200px",
              margin: "auto",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Outfit Maker</h1>

            {/* Button to toggle between Create Outfit and Saved Outfits views */}

            <Button
              onPress={toggleSavedOutfitsView}
              bgColor="primary.500"
              size="lg"
              _text={{ color: "black" }}
              mb={4}
            >
              {showSavedOutfits
                ? "Back to Outfit Creation"
                : "View Saved Outfits"}
            </Button>

            {/* Show Saved Outfits Gallery if toggled */}

            {showSavedOutfits ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {savedOutfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    style={{
                      width: "100px",
                      textAlign: "center",
                      cursor: "pointer",
                      border: "1px solid #ddd",
                      padding: "10px",
                    }}
                    onClick={() => setModalOutfit(outfit)} // Open modal on click
                  >
                    <img
                      src={outfit.items[0]?.image} // Show first item as preview (you can modify this)
                      alt={outfit.items[0]?.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <p>{outfit.items.length} items</p>
                  </div>
                ))}

                {/* Modal */}
                {modalOutfit && (
                  <div
                    style={{
                      position: "fixed",
                      top: "0",
                      left: "0",
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      zIndex: 1000,
                    }}
                    onClick={() => setModalOutfit(null)} // Close modal on overlay click
                  >
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                        maxWidth: "600px",
                        maxHeight: "80%",
                        overflowY: "auto",
                      }}
                      onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
                    >
                      <h2>Outfit Details</h2>
                      {modalOutfit.items.map((item, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              // width: "50px",
                              // height: "50px",
                              objectFit: "cover",
                            }}
                          />
                          <p>{item.name}</p>
                        </div>
                      ))}

                      {/* Close modal button */}

                      <Button
                        onPress={() => setModalOutfit(null)} // Close modal button
                        bgColor="primary.500"
                        size="lg"
                        _text={{ color: "black" }}
                        mb={4}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Button to create a new outfit */}
                <Button
                  onPress={toggleMenu}
                  bgColor="primary.500"
                  size="lg"
                  _text={{ color: "black" }}
                  mb={4}
                >
                  + Create Your Outfit
                </Button>

                {/* Show the category menu when toggled */}

                {showMenu && (
                  <CategoryMenu
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                    onBackToCategories={handleBackToCategories}
                    onItemSelect={handleItemSelect}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                  />
                )}

                {/* Canvas to display selected items */}

                <Box
                  w="100%"
                  h="100%" // Maintain space even when hidden
                  style={{
                    display: showMenu ? "none" : "flex",
                    opacity: showMenu ? 0 : 1,
                  }}
                >
                  <Canvas
                    items={selectedItems}
                    onDeleteItem={handleDeleteItem}
                    onUpdateItemPosition={handleUpdateItemPosition}
                  />
                </Box>
                {/* Button to save the outfit */}

                <Button
                  onPress={() => {
                    handleSaveOutfit();
                    setSaveConfirmation(true);
                    setTimeout(() => setSaveConfirmation(false), 2000);
                  }}
                  bgColor={saveConfirmation ? "green.500" : "primary.500"}
                  size="lg"
                  _text={{ color: "black" }}
                  mb={4}
                >
                  {/* Confirmation message */}

                  {saveConfirmation
                    ? "Outfit Saved successfully!"
                    : "Save Outfit"}
                </Button>
              </>
            )}
          </div>
        </ScrollView>
        <HStack space={2} justifyContent="center">
          <Button size="md">Save Outfit</Button>
          <Button size="md" variant="outline">
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
