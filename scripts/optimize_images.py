import os
import sys
from PIL import Image

def optimize_images(input_dir, output_dir, quality=80):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif')):
            img_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.webp')
            
            try:
                with Image.open(img_path) as img:
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    img.save(output_path, 'WEBP', quality=quality, method=6)
                    print(f"✅ Optimized: {filename} -> {os.path.basename(output_path)}")
            except Exception as e:
                print(f"❌ Error processing {filename}: {e}")

if __name__ == "__main__":
    input_folder = "public/images/raw_gallery"
    output_folder = "public/images/gallery"
    
    if not os.path.exists(input_folder):
        os.makedirs(input_folder)
        print(f"📁 Created input folder: {input_folder}")
        print("Please place your images in this folder and run the script again.")
        sys.exit(0)

    print(f"🚀 Starting optimization from {input_folder} to {output_folder}...")
    optimize_images(input_folder, output_folder)
    print("✨ Optimization complete.")
