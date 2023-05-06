CREATE TABLE "public"."uploads" ("fileID" uuid NOT NULL DEFAULT gen_random_uuid(), "filename" text NOT NULL, "uploaded_at" timestamptz NOT NULL DEFAULT now(), "upload_url" text NOT NULL, "apikeyUsed" uuid NOT NULL, "uploader_ip" text, PRIMARY KEY ("fileID") , FOREIGN KEY ("apikeyUsed") REFERENCES "public"."apikeys"("keyID") ON UPDATE cascade ON DELETE cascade, UNIQUE ("fileID"), UNIQUE ("upload_url"));COMMENT ON TABLE "public"."uploads" IS E'File Uploads Data';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
