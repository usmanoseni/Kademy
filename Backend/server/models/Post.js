const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    content_title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100,  'Please provide content'],
    },
    video_clip: {
      type: String,
      default: 'default-post.jpg',
    },
    doc_material: {
      type: String,
      default: 'default.doc',
    },
    slug: {
      type: String,
      unique: true,
    },
    Tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    Department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
      required: true,
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Always create slug from title before saving
PostSchema.pre('save', function (next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  } else {
    this.slug = '';
  }
  console.log('Pre-save hook: title =', this.title, ', slug =', this.slug);
  next();
});

// Virtual for post URL
PostSchema.virtual('url').get(function () {
  return `/posts/${this.slug}`;
});

// Method to add a comment
PostSchema.methods.addComment = function (userId, content) {
  this.comments.push({ user: userId, content });
  return this.save();
};

// Method to increment view count
PostSchema.methods.incrementViewCount = function () {
  this.viewCount += 1;
  return this.save();
};

module.exports = mongoose.model('Post', PostSchema); 