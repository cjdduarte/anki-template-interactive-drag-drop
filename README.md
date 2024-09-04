# Anki Interactive Flashcard Template

This repository contains an interactive flashcard template for Anki, featuring drag-and-drop functionality and visual feedback.

![image](https://github.com/user-attachments/assets/e220cf30-e9e1-40a4-b8c3-557a27999f5c)

![image](https://github.com/user-attachments/assets/d458ad52-5f54-4a5c-aade-818c0a2e25b9)

## Files
- `front.html`: The HTML code for the front side of the flashcard.
- `back.html`: The HTML code for the back side of the flashcard (optional).
- `style.css`: The CSS styling for the flashcards.

## How to Use

1. Open Anki.
2. Go to `Tools` > `Manage Note Types`.
3. Create a new note type or edit an existing one.
4. Copy the content from `front.html` into the front template.
5. Copy the content from `back.html` (if used) into the back template.
6. Copy the content from `style.css` into the Styling section.
7. When creating cards, use the | character to separate multiple correct answers within the same field.

<b> #### Change Log:</b>

v1.1 - 2024-09-04
- Added trim to terms comparison to remove spaces around '|' separators.
- Evaluated forgotten terms as incorrect with -1 feedback.
- Dynamic headers and terms handling for up to 5 columns.
- Added support for dynamic vertical and horizontal table generation based on layout.
- Fixed comparison logic for terms with multiple answers using '|' to trim extra spaces.
- Added visual feedback for both correct (+1) and incorrect (-1) answers, including forgotten terms.

v1.0 - 2024-09-04
- Initial release

## License
[MIT License.]
