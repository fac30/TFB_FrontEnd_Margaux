import { Box, Button, Text, useToast } from 'native-base'
import { useState, useEffect } from 'react'

let deferredPrompt: any

export default function PWAInstallPrompt() {
  const [showInstallButton, setShowInstallButton] = useState(false)
  const toast = useToast()

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      setShowInstallButton(true)
    })

    window.addEventListener('appinstalled', () => {
      toast.show({
        description: 'App installed successfully!',
        placement: 'top'
      })
      setShowInstallButton(false)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {})
      window.removeEventListener('appinstalled', () => {})
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        deferredPrompt = null
      }
    }
  }

  if (!showInstallButton) return null

  return (
    <Box position="fixed" bottom={4} right={4} p={4} bg="white" shadow={2} rounded="md">
      <Text mb={2} color="black">Install Inside My Closet app?</Text>
      <Button onPress={handleInstallClick} bg="primary.500">
        Install
      </Button>
    </Box>
  )
} 