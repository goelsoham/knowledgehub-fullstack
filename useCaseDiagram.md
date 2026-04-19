```mermaid
usecaseDiagram
    actor Guest
    actor Reader
    actor Author
    actor Admin

    Guest --> (Browse Articles)
    Guest --> (Search Articles)
    Guest --> (View Categories)
    Guest --> (Register)
    Guest --> (Login)

    Reader --> (Login)
    Reader --> (Read Articles)
    Reader --> (Comment on Article)
    Reader --> (Bookmark Article)
    Reader --> (View Profile)

    Author --> (Create Article)
    Author --> (Edit Own Article)
    Author --> (Delete Own Article)
    Author --> (View Own Articles)

    Admin --> (Approve Article)
    Admin --> (Reject Article)
    Admin --> (Manage Users)
    Admin --> (Delete Any User)
    Admin --> (View Pending Articles)

    Reader -|> Guest
    Author -|> Reader
    Admin -|> Reader
```
