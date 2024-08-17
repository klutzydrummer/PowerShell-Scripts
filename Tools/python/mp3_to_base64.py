import base64
from pop_up_windows import file_folder_picker
from pydub import AudioSegment
from io import BytesIO

def trim_and_convert_to_base64(input_file, start_time, duration, output_format='mp3'):
    # Load the audio file
    audio = AudioSegment.from_mp3(input_file)
    
    # Calculate the end time in milliseconds
    end_time = start_time + duration
    
    # Trim the audio
    trimmed_audio = audio[start_time:end_time]
    
    # Save trimmed audio to a BytesIO object
    buffer = BytesIO()
    trimmed_audio.export(buffer, format=output_format)
    buffer.seek(0)
    
    # Convert to base64
    base64_audio = base64.b64encode(buffer.read()).decode('utf-8')
    
    return base64_audio

# Example usage:
input_file = file_folder_picker(
        title = "Select audio file.",
        mode = "file",
        action = "open",
        file_types = [("MP3 Files", "*.mp3"), ("All files", "*.*")]
    )
start_time = 0  # Start time in milliseconds (e.g., 0ms for the beginning)
duration = 3 * 1000  # Duration in milliseconds (e.g., 1000ms = 1 second)

base64_audio = trim_and_convert_to_base64(input_file, start_time, duration)
print(base64_audio)
save_path = file_folder_picker(
    title = "Save audio as base64 string in text file.",
    mode = "file",
    action = "save",
    file_types = [("Plain Text", "*.txt"), ("All files", "*.*")],
    default_extension = ".txt"
)

with open(save_path, 'w', encoding='utf-8', errors='ignore') as f:
    f.write(base64_audio)