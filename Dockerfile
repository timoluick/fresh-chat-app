FROM denoland/deno:1.35.0

WORKDIR /app

COPY . .
RUN deno cache main.ts --unstable

EXPOSE 8000

CMD ["run", "-A", "--unstable", "main.ts"]