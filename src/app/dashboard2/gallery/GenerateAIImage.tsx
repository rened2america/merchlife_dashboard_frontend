import axios from '@/service/axiosInstance';
import { useState } from 'react';
import { FaCoins } from "react-icons/fa6";

const GenerateAIImage = ({ onImageGenerated, availableCredits }) => {
  const [loading, setLoading] = useState(false);
  const [textPrompt, setTextPrompt] = useState("");
  const [imageName, setImageName] = useState("");

  async function fetchImage(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textPrompt, imageName }),
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        throw new Error(data.error);
      }
 
      // Deduct one credit on every image generation
      await axios.patch(`product/generateImage`);

      // Convert the base64 string back into a Blob
      const base64Response = await fetch(`data:image/webp;base64,${data.image}`);
      const blob = await base64Response.blob();

      onImageGenerated(imageName, blob); // Pass the ObjectURL instead of base64

    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg">
      <form onSubmit={fetchImage}>
        <h3 className='text-white mb-2 text-center'>Generate AI Image</h3>
        <h4 className="flex items-center my-2">
          Available credits:
          <span className="flex items-center ml-2">
            {availableCredits}
            <FaCoins className="ml-1" />
          </span>
        </h4>

        <div className="flex flex-col gap-4 text-white">
          <div>
            <label htmlFor="imageName" className='text-white text-sm'>Title</label>
            <input
              type="text"
              id='imageName'
              className="p-2 w-full text-sm bg-gray-800 rounded border border-gray-600"
              placeholder="Cute Dog.."
              required
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="prompt" className='text-white text-sm'>Prompt</label>
            <textarea
              id='prompt'
              className="p-2 w-full text-sm bg-gray-800 rounded border border-gray-600"
              placeholder="Cute dog with big ears on mars..."
              required
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-2 text-sm bg-gray-800 rounded border border-gray-400 hover:bg-gray-900"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateAIImage;