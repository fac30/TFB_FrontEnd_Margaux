import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu";
import Canvas from "./Canvas";
import { 
  Button, 
  Box, 
  Heading, 
  VStack, 
  Modal, 
  Text, 
  Flex, 
  Image,
  Alert 
} from "native-base";

// Define a type for saved outfits
interface SavedOutfit {
  id: string;
  items: { name: string; image: string; x: number; y: number }[];
}

export default function OutfitMakerComponent() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ name: string; image: string; x: number; y: number }[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]); // State to store saved outfits
  const [showSavedOutfits, setShowSavedOutfits] = useState(false); // State to toggle views
  const [saveConfirmation, setSaveConfirmation] = useState(false); // Confirmation state

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

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
        x: Math.random() * 400, // Random position for x (within canvas width)
        y: Math.random() * 300, // Random position for y (within canvas height)
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
      prev.map((item, i) =>
        i === index ? { ...item, x, y } : item
      )
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
      w="100%" 
      maxW="100vw" 
      overflow="hidden"
      px={2} // reduced padding for mobile
    >
      <Heading textAlign="center" mb={4} fontSize={{ base: "xl", md: "2xl" }}>Outfit Maker</Heading>

      <Button
        onPress={toggleSavedOutfitsView}
        colorScheme="primary"
        size="lg"
        mb={4}
      >
        {showSavedOutfits ? "Back to Outfit Creation" : "View Saved Outfits"}
      </Button>

      {showSavedOutfits ? (
        <Flex 
          direction="row" 
          wrap="wrap" 
          gap={2} // reduced gap for mobile
          w="100%"
          justify="center"
        >
          {savedOutfits.map((outfit) => (
            <Box
              key={outfit.id}
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              p={2}
              w={{ base: "80px", md: "100px" }} // smaller on mobile
              alignItems="center"
              onPress={() => setModalOutfit(outfit)}
            >
              <Image
                source={{ uri: outfit.items[0]?.image }}
                alt={outfit.items[0]?.name}
                size={{ base: "60px", md: "80px" }} // smaller on mobile
              />
              <Text fontSize="xs" mt={1}>{outfit.items.length} items</Text>
            </Box>
          ))}

          <Modal isOpen={!!modalOutfit} onClose={() => setModalOutfit(null)}>
            <Modal.Content maxW="400px">
              <Modal.CloseButton />
              <Modal.Header>Outfit Details</Modal.Header>
              <Modal.Body>
                <VStack space={3}>
                  {modalOutfit?.items.map((item, index) => (
                    <Flex key={index} direction="row" alignItems="center">
                      <Image
                        source={{ uri: item.image }}
                        alt={item.name}
                        size="50px"
                        mr={2}
                      />
                      <Text>{item.name}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={() => setModalOutfit(null)}>Close</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Flex>
      ) : (
        <VStack 
          space={4} 
          w="100%" 
          alignItems="center"
        >
          <Button
            onPress={toggleMenu}
            colorScheme="primary"
            size="lg"
            w={{ base: "full", md: "auto" }} // full width on mobile
          >
            + Create Your Outfit
          </Button>

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

          <Canvas
            items={selectedItems}
            onDeleteItem={handleDeleteItem}
            onUpdateItemPosition={handleUpdateItemPosition}
          />

          <Button
            onPress={handleSaveOutfit}
            colorScheme="primary"
            size="lg"
            w={{ base: "full", md: "auto" }} // full width on mobile
          >
            Save Outfit
          </Button>

          {saveConfirmation && (
            <Alert status="success" w="100%">
              <Alert.Icon />
              <Alert.Title>Outfit saved successfully!</Alert.Title>
            </Alert>
          )}
        </VStack>
      )}
    </Box>
  );
}
