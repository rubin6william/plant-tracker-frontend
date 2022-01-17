const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function storePlant(params) {
  const formData = new FormData()

  formData.append('name', params.name)
  formData.append('species', params.species)
  formData.append('watering_instructions', params.watering_instructions)

  if (params.photo) {
    formData.append('photo', params.photo)
  }

  const response = await fetch(`${API_URL}/api/plants`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: formData
  })

  const result = await response.json()

  if (!response.ok) {
    throw result
  }

  return result
}