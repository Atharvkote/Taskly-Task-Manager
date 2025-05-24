<!-- ![Image](./src/assets/react.svg)
![Image](./src/assets/vite.svg) -->

# React + Vite

```mermaid
graph TD

    1066["User<br>External Actor"]
    subgraph 1053["External Systems"]
        1064["Database APIs<br>MongoDB, etc."]
        1065["Identity Provider APIs<br>Google, GitHub, etc."]
    end
    subgraph 1054["Backend API Server<br>Node.js/Express"]
        1061["Server Entry &amp; Main Router<br>Node.js/Express"]
        1062["API Route Handlers<br>Node.js/Express"]
        1063["Data Schemas<br>Mongoose"]
        1061 -->|Mounts| 1062
        1061 -->|Uses| 1063
        1062 -->|Uses| 1063
    end
    subgraph 1055["Web Application<br>React/Vite"]
        1056["Main Entry<br>JavaScript/JSX"]
        1057["App Root<br>React Component"]
        1058["UI Components<br>React/JSX"]
        1059["State Management<br>Redux"]
        1060["Client Todo Logic<br>JavaScript"]
        1056 -->|Renders| 1057
        1057 -->|Uses| 1058
        1057 -->|Uses| 1059
        1058 -->|Uses| 1059
        1058 -->|Calls| 1060
    end
    1066 -->|Interacts with| 1056
    1058 -->|Initiates OAuth via| 1062
    1060 -->|Makes API calls to| 1062
    1061 -->|Connects to| 1064
    1062 -->|Interacts with| 1065
