import sys
import subprocess

def run_command(command, error_message):
    try:
        subprocess.run(command, check=True, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        print(f"ERROR: {error_message}")
        print(f"Stdout:\n{e.stdout.decode()}")
        print(f"Stderr:\n{e.stderr.decode()}")
        sys.exit(1)

def main():
    print("Running lint...")
    run_command("npm run lint", "Lint failed.")

    print("Running typecheck...")
    run_command("npx tsc --noEmit", "Typecheck failed.")

    print("Running build...")
    run_command("npm run build", "Build failed.")

    print("All checks passed.")

if __name__ == "__main__":
    main()
