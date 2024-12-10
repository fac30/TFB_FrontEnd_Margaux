import { Box, Text, Center } from 'native-base';

export default function Footer() {
  return (
    <Box bg="gray.50" py={4} position="relative" bottom={0} width="100%">
      <Center>
        <Text color="gray.600">
          © 2024 Inside My Closet. All rights reserved.
        </Text>
      </Center>
    </Box>
  );
}
