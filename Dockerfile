# Multi-stage build for Next.js application
# Stage 1: Dependencies installation
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Increase timeout for font loading to prevent build hangs (180 seconds)
ENV NEXT_FONT_LOADER_TIMEOUT=180000
# Allow network requests to timeout gracefully
ENV NODE_OPTIONS="--max-old-space-size=4096"
# Build argument for font timeout (can be overridden)
ARG NEXT_FONT_LOADER_TIMEOUT=180000

# Build the application
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install wget for healthcheck
RUN apk add --no-cache wget

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy messages directory (needed for translations)
COPY --from=builder /app/messages ./messages

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]

