import dbConnect from "@/lib/Database";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 console.log("Hello World");
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDDMzmNBJ8BNvyWMehl3vRqR7Q7F4jr-1g",
    authDomain: "plypicker-d6452.firebaseapp.com",
    projectId: "plypicker-d6452",
    storageBucket: "plypicker-d6452.appspot.com",
    messagingSenderId: "300211142279",
    appId: "1:300211142279:web:3cc3dd5c852035ac9cc222",
    measurementId: "G-YD4EVRBNCG"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const config = {
  api: {
    bodyParser: false, // Disable body parsing by Next.js
  },
};

// Async function to store image in Firebase Storage
async function storeImage(imageBuffer) {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const filename = `images/${uuidv4()}.png`;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, imageBuffer);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
}

export async function POST(req, res) {
  await dbConnect();
  // Log to see incoming data
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file)
  const image = req.file;
  return new Promise((resolve, reject) => {
    upload.single("image")(req, {}, async (err) => {
      if (err) {
        return resolve(NextResponse.json({ message: "File upload error" }, { status: 400 }));
      }

      const { name, description, price } =  await req.json();
     

      if (!name || !description || !price || !image) {
        return resolve(NextResponse.json({ message: "Please fill all fields" }, { status: 400 }));
      }

      try {
        const imageUrl = await storeImage(image);
        const product = await Product.create({ name, description, price, image: imageUrl });
        return resolve(NextResponse.json(product, { status: 201 }));
      } catch (error) {
        console.error(error);
        return resolve(NextResponse.json({ message: "Error creating product" }, { status: 500 }));
      }
    });
  });
}
