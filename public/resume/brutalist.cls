% Brutalist themed cls file for Ceyhun Şen's resume.

% Class initialization.
\ProvidesClass{brutalist}
\NeedsTeXFormat{LaTeX2e}
\LoadClass{article}

% Page styling.
\RequirePackage[margin=10mm,a4paper]{geometry}
\RequirePackage{multicol}
\pagestyle{empty}

% General styling.
\RequirePackage{color}
\RequirePackage{hyperref}
\definecolor{darkblue}{RGB}{0, 20, 50}
\hypersetup{colorlinks=true, linkcolor=darkblue, urlcolor=darkblue}

% Fonts.
\RequirePackage{fontawesome5}
\RequirePackage{fontspec}
\setmainfont[Language=English]{Roboto}

% Title styling.
\RequirePackage{titlesec}
\RequirePackage[skip=10pt]{parskip}

% List styling.
\RequirePackage{enumitem}
\setlist[itemize]{noitemsep,topsep=0pt}

% Reformat sections.
\titleformat{\section}
	{\huge\bfseries}
	{}
	{0em}
	{}
	[\titlerule]
\titlespacing*{\section}{5pt}{0pt}{2pt}

% Reformat subsections.
\titleformat{\subsection}
	{\large\bfseries}
	{}
	{0em}
	{}
	[]
\titlespacing*{\subsection}{0pt}{0pt}{0pt}

% Reformat subsubsections.
\titleformat{\subsubsection}
	{\small\itshape\bfseries}
	{}
	{0em}
	{}
	[]
\titlespacing*{\subsubsection}{0pt}{0pt}{0pt}
