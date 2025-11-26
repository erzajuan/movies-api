const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI = `${process.env.MONGO_CLUSTER_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "✅ MongoDB connected successfully! : ",
      mongoose.connection.name
    );
    console.log();
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Keluar dari proses kalau gagal konek
  }
};

module.exports = connectDB;
