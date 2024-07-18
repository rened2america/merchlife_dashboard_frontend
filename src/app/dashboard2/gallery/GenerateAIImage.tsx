import { useState } from 'react';

const GenerateAIImage = ({ onImageGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [textPrompt, setTextPrompt] = useState("");
  const [imageName, setImageName] = useState("");

  async function fetchImage(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("prompt", textPrompt);
    formData.append("output_format", "webp");
    formData.append("aspect_ratio", "2:3");
    let apiKey = process.env.NEXT_PUBLIC_STABILITY_AI_API_KEY;
    console.log("apiKey: ", apiKey)
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          `Bearer ${apiKey}`,
        Accept: "image/*",
      },
    };

    try {
      const response = await fetch(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
      }

      const imageBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);
      const blob = new Blob([buffer], { type: "image/png" });
      onImageGenerated(imageName, blob);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  }

  const getTextPrompt = (e) => {
    console.log(e);
    setTextPrompt(e.target.value);
  };

  const getImageName = (e) => {
    console.log(e);
    setImageName(e.target.value);
  };

  return (
    <div className="rounded-lg">
      <form>
        <h3 className='text-white mb-2 text-center'>Generate AI Image</h3>
        <div className="flex flex-col gap-4 text-white">
          <div>
            <label htmlFor="imageName" className='text-white text-sm'>Title</label>
            <input
              type="text"
              id='imageName'
              className="p-2 w-full text-sm bg-gray-800 rounded border border-gray-600"
              placeholder="Cute Dog.."
              required
              onChange={getImageName}
            />
          </div>
          <div>
            <div className="relative w-full">
              <label htmlFor="prompt" className='text-white text-sm'>Prompt</label>
              <textarea
                id='prompt'
                className="p-2 w-full text-sm bg-gray-800 rounded border border-gray-600"
                placeholder="Cute dog with big ears on mars..."
                required
                onChange={getTextPrompt}
              />
            </div>
            <button
              onClick={fetchImage}
              className="w-full p-2 mt-2 text-sm bg-gray-800 rounded border border-gray-400 hover:bg-gray-900"
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </div>
        </div>
      </form>
    </div>
    )
}

export default GenerateAIImage;