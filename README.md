# Pixel Art Studio - Educational Platform

An interactive pixel art creation tool designed for 9th and 10th grade students to learn digital art through creative challenges.

## Features

### For Students
- **Interactive Pixel Editor**: Draw on customizable grids (16x16 to 32x32) with an intuitive color palette
- **Creative Challenges**: Six built-in challenges ranging from simple emojis to complex platform backgrounds
- **Gallery Sharing**: Submit artwork to a class gallery with your name and artwork title
- **Real-time Drawing**: Click and drag to paint pixels, with tools for clearing and filling

### For Teachers
- **Classroom Showcase**: Click any artwork in the gallery to enlarge it for display on projectors or smart boards
- **Progressive Difficulty**: Challenges scale from easy (16x16 emojis) to hard (32x32 backgrounds)
- **Safe Sharing**: No authentication required - students only provide their name
- **Challenge Variety**: 
  1. Create an Emoji (Easy, 16x16)
  2. Game Object (Medium, 16x16)
  3. Platform Game Background (Hard, 32x32)
  4. Cute Puzzle Character (Medium, 24x24)
  5. Food Item (Easy, 16x16)
  6. Fantasy Weapon (Medium, 20x20)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (already configured in this project)

### Database Setup
1. The database schema is ready in `scripts/001_create_tables.sql`
2. Run the script directly from the v0 interface (no need to leave v0!)
3. This creates the `pixel_artworks` table with Row Level Security enabled

### Running the Application
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Navigation

- **Home** (`/`) - Introduction and overview of the platform
- **Challenges** (`/challenges`) - Browse all available challenges
- **Editor** (`/editor`) - Free draw mode or challenge-specific editor
- **Gallery** (`/gallery`) - View all student submissions

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives
- **Type Safety**: TypeScript

## Classroom Usage Tips

### Starting a Lesson
1. Begin at the **Challenges** page to show students the available options
2. Demonstrate the editor tools: color picker, palette, clear, and fill buttons
3. Encourage students to start with easier challenges and progress

### Showcasing Work
1. Navigate to the **Gallery** page
2. Click any artwork to open it in full-screen showcase mode
3. Perfect for displaying on classroom projectors or smart boards
4. Students can see their work and classmates' creations

### Managing Submissions
- All artworks are stored in the Supabase database
- Submissions include: title, student name, grid data, challenge type, and timestamp
- View recent submissions at the top of the gallery (sorted by newest first)

## Privacy & Safety

- No user authentication required - minimal friction for students
- Students only provide their first name or preferred name
- No personal information collected beyond what's submitted
- All submissions are public within the classroom gallery

## Customization

### Adding New Challenges
Edit `lib/challenges.ts` to add more challenges:

```typescript
{
  id: 7,
  title: "Your Challenge",
  description: "Challenge description",
  difficulty: "easy" | "medium" | "hard",
  gridSize: 16,
  icon: "🎨"
}
```

### Modifying Color Palettes
Update the `popularColors` array in `components/pixel-grid.tsx` to change available colors.

## Support

For technical issues or questions, refer to the v0 documentation or contact your technical administrator.

---

Built with v0 by Vercel
