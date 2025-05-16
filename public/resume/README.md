# Ceyhun Şen's Resume

This directory includes my resume.

It's written in latex. It is designed to be compiled with `xelatex`.

## Necessary Packages

Ubuntu:

```bash
sudo apt install -y latexmk texlive-xetex texlive texlive-fonts-extra texlive-fonts-recommended fonts-roboto*
```

## Compile The Document

It should be compiled with `latexmk`:

```bash
latexmk -r latexmkrc
```

Alternatively, there is a `makefile`:

```bash
# Compile the document
make
# Clean everything
make clean
```
