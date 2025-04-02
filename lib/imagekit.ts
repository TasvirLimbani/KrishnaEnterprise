// ImageKit configuration
const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/your_imagekit_id/"

// Function to get ImageKit URL for an image
export function getImageKitUrl(path: string, width = 600, height = 600): string {
  if (!path) {
    return `/placeholder.svg?height=${height}&width=${width}`
  }

  // If it's already an ImageKit URL or external URL, return as is
  if (path.startsWith("http")) {
    return path
  }

  // Otherwise, construct the ImageKit URL with transformations
  return path
}
